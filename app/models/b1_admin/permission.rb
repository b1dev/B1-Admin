module B1Admin
  class Permission < ActiveRecord::Base
    #Relations
    has_and_belongs_to_many :roles
    belongs_to :module
    #End Relations
    
    #Validates
    ALL_LANGS.each do |l|
    	validates :"desc_#{l}", length: { in: 5..200},format: {with:/\A^[^`!@#\$%\^&*+_=]+\z/i}
  	end
    validates :action,     length: { in: 4..20},format: {with:/\A^[^`!@#\$%\^&*+=]+\z/i}, presence: true
    #End validates
  end
end
