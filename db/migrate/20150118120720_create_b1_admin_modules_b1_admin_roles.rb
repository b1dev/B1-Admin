class CreateB1AdminModulesB1AdminRoles < ActiveRecord::Migration
  def up
    create_table :b1_admin_modules_b1_admin_roles, :id => false do |t|
      t.references :b1_admin_module, :b1_admin_role
    end

    add_index :b1_admin_modules_b1_admin_roles, [:b1_admin_module_id, :b1_admin_role_id],
      name: "b1_admin_modules_b1_admin_roles_index",
      unique: true
  end

  def down
  	drop_table :b1_admin_modules_b1_admin_roles
  end
end
