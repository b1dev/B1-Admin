class CreateB1AdminRolesB1AdminUsers < ActiveRecord::Migration
  def up
    create_table :b1_admin_roles_b1_admin_users, :id => false do |t|
      t.references :b1_admin_role, :b1_admin_user
    end

    add_index :b1_admin_roles_b1_admin_users, [:b1_admin_role_id, :b1_admin_user_id],
      name: "b1_admin_roles_b1_admin_users_index",
      unique: true
  end

  def down
  	drop_table :b1_admin_roles_b1_admin_users
  end
end
