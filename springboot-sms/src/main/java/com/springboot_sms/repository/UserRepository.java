package com.springboot_sms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot_sms.model.User;



public interface UserRepository extends JpaRepository<User , Long>{

	User save(User newUser);

}
