package com.example.UserManagement.service;

import com.example.UserManagement.model.AdditionalModel.IotData;
import com.example.UserManagement.model.Users.Doctor;
import com.example.UserManagement.model.Users.Patient;
import com.example.UserManagement.repo.IotRepo;
import com.example.UserManagement.repo.NotificationRepo;
import com.example.UserManagement.repo.PatientRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IotService {
    private final IotRepo iotRepo;
    private final NotificationRepo notificationRepo;
    private final MailService mailService;
    private final PatientRepo patientRepo;

    @Transactional
    public IotData saveIotData(IotData Data){
        IotData savedData =  iotRepo.save(Data);
        List<Doctor> doctors = getDoctorForPatient(savedData.getPatient().getId());
        if (doctors != null) {
            // Send email to the doctor
            String subject = "New IoT Data Received for Patient : " + savedData.getPatient().getFirstName() + savedData.getPatient().getLastName();
            String message = "New IoT data has been received for your patient:\n\n" +
                    "Room Temp: " + savedData.getField1() + "\n" +
                    "Humidity: " + savedData.getField2() + "\n" +
                    "Body Temp: " + savedData.getField3() + "\n" +
                    "SpO2: " + savedData.getField4() + "\n" +
                    "ECG: " + savedData.getField5() + "\n" +
                    "Timestamp: " + savedData.getCreatedAt();

            for (Doctor doctor : doctors) {
                mailService.sendEmail(doctor.getEmail(), subject, message);
            }
        }
        deletedOldEntries();
        return savedData;

    }
    public List<IotData> getRecentDataForPatient(Long patientId) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return iotRepo.findByPatientIdAndCreatedAtAfter(patientId, sevenDaysAgo);
    }

    public void deletedOldEntries(){
        LocalDateTime cutOfDate = LocalDateTime.now().minusDays(7);
        iotRepo.deleteOldEntries(cutOfDate);
    }

    private List<Doctor> getDoctorForPatient(Long patientId) {

        Patient patient = patientRepo.findById(patientId).orElseThrow(()->new RuntimeException("Patient Not Found"));

        return patient.getDoctors();
    }






}
