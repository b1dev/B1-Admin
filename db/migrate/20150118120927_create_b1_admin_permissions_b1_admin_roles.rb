class CreateB1AdminPermissionsB1AdminRoles < ActiveRecord::Migration
  def up
    create_table :b1_admin_permissions_roles, :id => false do |t|
      t.integer :role_id, null: false
      t.integer :permission_id, null: false
    end

    add_index :b1_admin_permissions_roles, [:permission_id, :role_id],
      name: "b1_admin_permissions_roles_index",
      unique: true
  end

  def down
  	drop_table :b1_admin_permissions_roles
  end
end
