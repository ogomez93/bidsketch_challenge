module WebpackHelper
  def webpack_asset_tag(name)
    case name.split('.').last
    when 'css'
      stylesheet_link_tag(asset_file(name))
    when 'js'
      javascript_include_tag(asset_file(name))
    end
  end

  def webpack_image_tag(path, args)
    image_tag asset_file('images/' + path), **args
  end

  def webpack_favicon_tag(path, args)
    favicon_link_tag asset_file('images/' + path), **args
  end

  def webpack_common_tag
    capture do
      concat webpack_style_tag
    end
  end

  def webpack_style_tag(name = :styles)
    webpack_asset_tag Rails.env.development? ? "#{name.to_s}.js" : "#{name.to_s}.css"
  end

  def webpack_bundle_tag(name)
    name = name.to_s.split('.').first
    webpack_asset_tag "#{name.to_s}.js"
  end

  def asset_file(name)
    case Rails.env
    when 'test'
      return name
    else
      manifest = File.open(Rails.root + "public/assets/manifest.json")
    end

    JSON.parse(manifest.read)[name]
  end
end
