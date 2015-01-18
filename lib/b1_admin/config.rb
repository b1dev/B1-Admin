module B1Admin
  class Config
   DATA = {}
   private_constant :DATA
   def self.setup! configuration
    raise B1Admin::Exception.new(1) unless configuration.kind_of? Rails::Engine::Configuration
    Dir.glob("#{configuration.root.to_s}/config/configs/*").each do |file|
      data = YAML::load(ERB.new(IO.read(File.open(file))).result)
      raise B1Admin::Exception.new(3,{env:Rails.env}) unless data.kind_of?(Hash) &&  data.has_key?(Rails.env)
      DATA.merge! data[Rails.env]
    end
   end

   def self.method_missing meth, *args, &block
    DATA.has_key?(meth.to_s) ? DATA[meth.to_s] : (raise B1Admin::Exception.new(2,{meth:meth}))
   end
  end
end