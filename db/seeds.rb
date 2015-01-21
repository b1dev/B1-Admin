# encoding UTF-8
if B1Admin::Role.count ==0
	role_1 = B1Admin::Role.new(name:"Admin",:"desc_#{I18n.default_locale}"=>"Can access to admin panel")
	role_2 = B1Admin::Role.new(name:"Settings Admin",:"desc_#{I18n.default_locale}"=>"Can access to settings section")
	role_3 = B1Admin::Role.new(name:"Modules Admin",:"desc_#{I18n.default_locale}"=>"Can access to settings section")
  B1Admin::LANGS.each do |l|
    role_1.send("desc_#{l}=",role_1.send("desc_#{I18n.default_locale}"))
    role_2.send("desc_#{l}=",role_2.send("desc_#{I18n.default_locale}"))
    role_3.send("desc_#{l}=",role_3.send("desc_#{I18n.default_locale}"))
  end
  role_1.save
  role_2.save
  role_3.save
end

if B1Admin::Module.count == 0
	parent_mod = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Настройки",controller:"settings",ico:"fa-shield")
	mod_1 = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Модули",controller:"modules",parent_id:0)
	mod_2 = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Роли доступа",controller:"roles",parent_id:0)
	mod_3 = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Права доступа",controller:"permissions",parent_id:0)
	mod_4 = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Администраторы",controller:"admins",parent_id:0)
  parent_mod_2 = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Журналы",controller:"logs",ico:"fa-book")
  mod_5 = B1Admin::Module.new(:"name_#{I18n.default_locale}"=>"Логи ",controller:"systems",parent_id:0)
  B1Admin::LANGS.each do |l|
    parent_mod.send("name_#{l}=",parent_mod.send("name_#{I18n.default_locale}"))
    parent_mod_2.send("name_#{l}=",parent_mod_2.send("name_#{I18n.default_locale}"))
    mod_1.send("name_#{l}=",mod_1.send("name_#{I18n.default_locale}"))
    mod_2.send("name_#{l}=",mod_2.send("name_#{I18n.default_locale}"))
    mod_3.send("name_#{l}=",mod_3.send("name_#{I18n.default_locale}"))
    mod_4.send("name_#{l}=",mod_4.send("name_#{I18n.default_locale}"))
    mod_5.send("name_#{l}=",mod_5.send("name_#{I18n.default_locale}"))
  end
  parent_mod.save
  parent_mod_2.save
  mod_1.parent_id = parent_mod.id
  mod_2.parent_id = parent_mod.id
  mod_3.parent_id = parent_mod.id
  mod_4.parent_id = parent_mod.id
  mod_5.parent_id = parent_mod_2.id

  mod_1.save
  mod_2.save
  mod_3.save
  mod_4.save
  mod_5.save

  role = B1Admin::Role.first
  role.modules << B1Admin::Module.all
  role.save
end 
if B1Admin::User.count == 0
  user = B1Admin::User.create!( password: 'password', password_confirmation: 'password',name:"Admin",email:"admin@admin.net",phone:"+380937799996") 
  user.roles << B1Admin::Role.all 
  user.save
end