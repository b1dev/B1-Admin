class CreateB1AdminRoles < ActiveRecord::Migration
  def up
    create_table :b1_admin_roles do |t|
	    t.string   :name,       limit: 30, null: false
	    ALL_LANGS.each do |l|
	    	t.string   :"desc_#{l}",  limit: 50, null: false
	    end
	   
      t.timestamps
    end
  end

  def down
  	drop_table :b1_admin_roles
  end
end
