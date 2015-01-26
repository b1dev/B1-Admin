class AddPositionToModules < ActiveRecord::Migration
  def up
    add_column :b1_admin_modules, :position, :integer, default:0
  end

  def down
    remove_column :b1_admin_modules, :position
  end
end
