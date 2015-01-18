class CreateB1AdminModules < ActiveRecord::Migration
  def up
    create_table :b1_admin_modules do |t|
	    t.string   :ico,        limit: 20, default: "fa-file", null: false
	    t.integer  :parent_id,             default: 0,                null: false
	    ALL_LANGS.each do |l|
	    	t.string   :"name_{l}",       limit: 20,                            null: false
	  	end
	    t.string   :controller, limit: 50,                            null: false

      t.timestamps
    end
    add_index :admin_modules, [:parent_id]
  end
  def down
  	drop_table :b1_admin_modules
  end
end
