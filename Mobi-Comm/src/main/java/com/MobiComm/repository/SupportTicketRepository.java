package com.MobiComm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.MobiComm.model.SupportTicket;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Integer> {
    List<SupportTicket> findByUser_UserId(Integer userId);
}