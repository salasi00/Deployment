package authdto

import "housy/models"

type LoginResponse struct {
	Username string      `gorm:"type: varchar(255)" json:"username"`
	Token    string      `gorm:"type: varchar(255)" json:"token"`
	Role     models.Role `json:"role"`
}

type RegisterResponse struct {
	Username string `gorm:"type: varchar(255)" json:"username"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
}

type CheckAuthResponse struct {
	Id       int         `gorm:"type: int" json:"id"`
	Username string      `gorm:"type: varchar(255)" json:"username"`
	Email    string      `gorm:"type: varchar(255)" json:"email"`
	Role     models.Role `json:"role"`
}
