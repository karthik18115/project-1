package com.medirec.mapper;

import com.medirec.dto.AppointmentDto;
import com.medirec.dto.AppointmentRequestDto;
import com.medirec.entity.Appointment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-11T07:35:23+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.6 (Eclipse Adoptium)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Override
    public AppointmentDto appointmentToAppointmentDto(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        AppointmentDto appointmentDto = new AppointmentDto();

        appointmentDto.setUuid( appointment.getUuid() );
        appointmentDto.setPatientUuid( appointment.getPatientUuid() );
        appointmentDto.setDoctorUuid( appointment.getDoctorUuid() );
        appointmentDto.setAppointmentDateTime( appointment.getAppointmentDateTime() );
        appointmentDto.setDepartment( appointment.getDepartment() );
        appointmentDto.setStatus( appointment.getStatus() );

        return appointmentDto;
    }

    @Override
    public Appointment appointmentDtoToAppointment(AppointmentDto appointmentDto) {
        if ( appointmentDto == null ) {
            return null;
        }

        Appointment appointment = new Appointment();

        appointment.setUuid( appointmentDto.getUuid() );
        appointment.setPatientUuid( appointmentDto.getPatientUuid() );
        appointment.setDoctorUuid( appointmentDto.getDoctorUuid() );
        appointment.setAppointmentDateTime( appointmentDto.getAppointmentDateTime() );
        appointment.setDepartment( appointmentDto.getDepartment() );
        appointment.setStatus( appointmentDto.getStatus() );

        return appointment;
    }

    @Override
    public Appointment appointmentRequestDtoToAppointment(AppointmentRequestDto appointmentRequestDto) {
        if ( appointmentRequestDto == null ) {
            return null;
        }

        Appointment appointment = new Appointment();

        appointment.setPatientUuid( appointmentRequestDto.getPatientUuid() );
        appointment.setAppointmentDateTime( appointmentRequestDto.getAppointmentDateTime() );
        appointment.setDepartment( appointmentRequestDto.getDepartment() );
        appointment.setNotes( appointmentRequestDto.getNotes() );

        return appointment;
    }

    @Override
    public List<AppointmentDto> appointmentsToAppointmentDtos(List<Appointment> appointments) {
        if ( appointments == null ) {
            return null;
        }

        List<AppointmentDto> list = new ArrayList<AppointmentDto>( appointments.size() );
        for ( Appointment appointment : appointments ) {
            list.add( appointmentToAppointmentDto( appointment ) );
        }

        return list;
    }
}
