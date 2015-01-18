module B1Admin
  class Engine < ::Rails::Engine

    isolate_namespace B1Admin

    config.generators do |g|
      g.orm             :active_record
      g.template_engine :haml
      g.test_framework  :rspec
      g.helper false
      g.assets false
      g.view_specs false
    end

    initializer :append_migrations do |app|
      unless app.root.to_s.match root.to_s
        config.paths["db/migrate"].expanded.each do |path|
          app.config.paths["db/migrate"] << path
        end
      end
    end

    config.i18n.enforce_available_locales = false
    config.assets.paths << config.root.join("app", "assets", "fonts")
    config.assets.precompile += %w( admin/ie.js )
    config.i18n.load_path += Dir[config.root.join('locales', '*.{rb,yml}').to_s]

  end
end
