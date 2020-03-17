package com.storyart.apigateway.service;

import com.storyart.apigateway.common.constants.RoleName;
import com.storyart.apigateway.model.Role;


public interface RoleService {
    Role findRoleById(Integer id);

    Role findRoleByRoleName(RoleName roleName);

    void createDefaultRoles();
}
