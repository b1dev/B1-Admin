module B1Admin
  class Login
    include ::ActiveAttr::Model
    attribute :email,type: String
    attribute :password,type: String
    attribute :remember_me, default:false,type: Boolean
    validates :email, :password,:presence => true
    validates :email,    length: { in: 6..50 }, format:{with:/\A^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
    validates :password, length: { in: 5..20 }
  end
end
