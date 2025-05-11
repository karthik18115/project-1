package com.medirec.mapper;

import com.medirec.dto.AppointmentDto;
import com.medirec.dto.AppointmentRequestDto;
import com.medirec.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    AppointmentMapper INSTANCE = Mappers.getMapper(AppointmentMapper.class);

    AppointmentDto appointmentToAppointmentDto(Appointment appointment);

    Appointment appointmentDtoToAppointment(AppointmentDto appointmentDto);

    Appointment appointmentRequestDtoToAppointment(AppointmentRequestDto appointmentRequestDto);

    List<AppointmentDto> appointmentsToAppointmentDtos(List<Appointment> appointments);
} 