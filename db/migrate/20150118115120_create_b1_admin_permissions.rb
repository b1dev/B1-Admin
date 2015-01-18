class CreateB1AdminPermissions < ActiveRecord::Migration
  def up
    create_table :b1_admin_permissions do |t|
	    ALL_LANGS.each do |l|
	    	t.string   :"desc_#{l}",  limit: 50, null: false
	    end
	    t.integer  :b1_admin_module_id
	    t.string   :action

      t.timestamps
    end
    add_index :b1_admin_permissions, [:b1_admin_module_id]
  end
  def down
  	drop_table :b1_admin_permissions
  end
end
