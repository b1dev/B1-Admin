class CreateB1AdminUsers < ActiveRecord::Migration
  def up
    create_table :b1_admin_users do |t|
      t.string    :name
      t.string    :email, null: false
      t.string    :phone
      t.string    :position
      t.string    :password_digest, null: false
      t.boolean   :blocked, default: false
      t.datetime  :blocked_until
      t.integer   :wrong_password_attempts, default: 0
      t.integer   :signins_count, default: 0
      t.boolean   :active, default: true
      t.string    :avatar_file_name
      t.string    :avatar_content_type
      t.integer   :avatar_file_size
      t.datetime  :avatar_updated_at
      t.timestamps
    end
    add_index :admin_users, [:email, :blocked, :active]
  end

  def down
  	drop_table :b1_admin_users
  end
end
