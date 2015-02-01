module B1Admin
  class Log
    include Mongoid::Document

    store_in collection: 'tickets_core_logs', session: 'fluentd_logs'
  end
end
