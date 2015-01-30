require "b1_admin/langs"
require "b1_admin/exception"
require "b1_admin/config"
require "b1_admin/engine"
require 'b1_admin/usagewatch'

require "active_attr"
require "angularjs-rails"
require "angular-ui-bootstrap-rails"
require "signinable"
require "will_paginate"
#require "active_model_serializers"
module B1Admin
  WillPaginate.per_page = 1
end