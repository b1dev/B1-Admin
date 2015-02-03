require "active_attr"
require "b1_config"
require "angularjs-rails"
require "angular-ui-bootstrap-rails"
require "signinable"
require "will_paginate"
require "active_model_serializers"
require "mongoid"
require "mongo_mysql_relations"
require "will_paginate_mongoid"


require "b1_admin/langs"
require "b1_admin/exception"
require "b1_admin/engine"
require 'b1_admin/usagewatch'
module B1Admin
  WillPaginate.per_page = 25

  ActiveRecord::Base.send(:include, MongoMysqlRelations)

end