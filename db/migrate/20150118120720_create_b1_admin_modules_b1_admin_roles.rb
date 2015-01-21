class CreateB1AdminModulesB1AdminRoles < ActiveRecord::Migration
  def up
    create_table :b1_admin_modules_roles, :id => false do |t|
      t.integer :role_id, null: false
      t.integer :module_id, null: false
    end

    add_index :b1_admin_modules_roles, [:module_id, :role_id],
      name: "b1_admin_modules_roles_index",
      unique: true
  end

  def down
  	drop_table :b1_admin_modules_roles
  end
end
