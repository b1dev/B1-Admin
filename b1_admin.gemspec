$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "b1_admin/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "b1_admin"
  s.version     = B1Admin::VERSION
  s.authors     = ["Chernov Alexandr"]
  s.email       = ["adok@ukr.net"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of B1Admin."
  s.description = "TODO: Description of B1Admin."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.1.8"
  s.add_dependency "signinable"
  s.add_dependency "haml-rails"
  s.add_dependency "angularjs-rails"
  s.add_dependency "angular-ui-bootstrap-rails"
  s.add_dependency "paperclip"


  s.add_development_dependency "sqlite3"
  s.add_development_dependency "rspec-rails"
  s.add_development_dependency "habtm_generator"
end

