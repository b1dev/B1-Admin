class CreateB1AdminRolesB1AdminUsers < ActiveRecord::Migration
  def up
    create_table :b1_admin_roles_users, :id => false do |t|
      t.integer :role_id, null: false
      t.integer :user_id, null: false
    end

    add_index :b1_admin_roles_users, [:role_id, :user_id],
      name: "b1_admin_roles_users_index",
      unique: true
  end

  def down
  	drop_table :b1_admin_roles_users
  end
end
