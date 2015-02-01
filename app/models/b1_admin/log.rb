module B1Admin
  class Log
    STATUSES = {
      success:   1,
      warninig:  2,
      error:     3,
      exception: 4,
    }
    include ::Mongoid::Document
    include MongoMysqlRelations
    store_in session: 'b1_admin_logs'

    field :controller  , type: String
    field :action      , type: String
    field :user_id     , type: Integer
    field :params      , type: Hash
    field :status      , type: Integer
    field :ip          , type: String
    field :user_agent  , type: String
    field :description , type: String
    field :time        , type: Integer
    field :server_ip   , type: String

    index(user_id: 1)
    index({ controller: 1, action: 1 })
    index(status: 1)

    to_mysql_belongs_to :user, class: B1Admin::User, foreign_key: :user_id

    #default_scope desc(:time)
    # Insert log row to collection
    # @raise  [B1Admin::Exception] if param have a wrong type
    def self.activity row
      setup
      raise B1Admin::Exception.new(7,{text:"Create log row failed, param not a Hash:  #{row.inspect}"}) unless row.kind_of?(Hash)
      row.merge!(server_ip: server_ip)
      B1Admin::Log.create(row)
    end

    # Set the current collection by month year pattern <logs_02_2015>
    # If date not passed to method or isnt Date instance date set to Today
    # @param [Date]
    def self.setup date = false
      date = date && date.kind_of?(Date) ? date : Date.today
      store_in collection: date.strftime("logs_%m_%Y")
      self
    end

    private

    def self.server_ip
      @server_ip ||= Socket.ip_address_list.find { |ai| ai.ipv4? && !ai.ipv4_loopback? }.ip_address
    end

  end
end
