CREATE TABLE `auditLog` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `applicationName` varchar(255),
  `userId` varchar(255) NOT NULL,
  `userName` varchar(255),
  `tenantId` varchar(255),
  `tenantName` varchar(255),
  `impersonatorUserId` varchar(255),
  `impersonatorUserName` varchar(255),
  `impersonatorTenantId` varchar(255),
  `impersonatorTenantName` varchar(255),
  `executionTime` DATETIME NOT NULL,
  `executionDuration` INT NOT NULL,
  `clientIpAddress` varchar(255),
  `clientName` varchar(255),
  `clientId` varchar(255),
  `correlationId` varchar(255),
  `browserInfo` varchar(255),
  `httpMethod` varchar(255),
  `url` varchar(255),
  `exceptions` varchar(255),
  `comments` varchar(255),
  `httpStatusCode` INT,
  `extraProperties` varchar(255),
  `concurrencyStamp` varchar(255) NOT NULL
);

CREATE TABLE `auditLogAction` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `auditLogId` varchar(255) NOT NULL,
  `serviceName` varchar(255),
  `methodName` varchar(255),
  `parameters` varchar(255),
  `executionTime` DATETIME NOT NULL,
  `executionDuration` INT NOT NULL,
  `extraProperties` varchar(255)
);

CREATE TABLE `roles` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `name` varchar(255),
  `normalizedName` varchar(255),
  `isDefault` tinyint(1),
  `isStatic` tinyint(1),
  `isPublic` tinyint(1),
  `entityVersion` INT,
  `concurrencyStamp` varchar(255)
);

CREATE TABLE `userLogins` (
  `userId` varchar(255) NOT NULL,
  `loginProvider` varchar(255),
  `providerKey` varchar(255),
  `providerDisplayName` varchar(255)
);

CREATE TABLE `userRoles` (
  `userId` varchar(255) NOT NULL,
  `roleId` varchar(255) NOT NULL
);

CREATE TABLE `user` (
  `id` varchar(255) PRIMARY KEY NOT NULL,
  `userName` varchar(255),
  `normalizedUserName` varchar(255),
  `name` varchar(255),
  `surname` varchar(255),
  `email` varchar(255),
  `normalizedEmail` varchar(255),
  `emailConfirmed` tinyint(1) DEFAULT 0,
  `passwordHash` varchar(255),
  `securityStamp` varchar(255),
  `isExternal` tinyint(1) DEFAULT 0,
  `phoneNumber` varchar(255),
  `phoneNumberConfirmed` tinyint(1) DEFAULT 0,
  `isActive` tinyint(1),
  `twoFactorEnabled` tinyint(1) DEFAULT 0,
  `lockoutEnd` timestamp DEFAULT CURRENT_TIMESTAMP,
  `lockoutEnabled` tinyint(1) DEFAULT 0,
  `accessFailedCount` INT DEFAULT 0,
  `shouldChangePasswordOnNextLogin` tinyint(1),
  `entityVersion` INT,
  `lastPasswordChangeTime` timestamp DEFAULT CURRENT_TIMESTAMP,
  `extraProperties` varchar(255),
  `concurrencyStamp` varchar(255),
  `creationTime` timestamp DEFAULT CURRENT_TIMESTAMP,
  `creatorId` varchar(255) NOT NULL,
  `lastModificationTime` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastModifierId` varchar(255),
  `isDeleted` tinyint(1) DEFAULT 0,
  `deleterId` varchar(255),
  `deletionTime` timestamp NULL
);

ALTER TABLE `auditLog` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `auditLogAction` ADD FOREIGN KEY (`auditLogId`) REFERENCES `auditLog` (`id`);

ALTER TABLE `userLogins` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `userRoles` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `userRoles` ADD FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);
