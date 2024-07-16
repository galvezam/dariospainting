package com.galvez.dariospainting.service.servInterface;


import com.galvez.dariospainting.dto.LoginRequest;
import com.galvez.dariospainting.dto.Response;
import com.galvez.dariospainting.model.User;

public interface UserServInterface {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

    Response updateUserProfile(User user);

    Response getUserByPhoneNumberAndEmail(String phoneNumber, String email);
    

}
