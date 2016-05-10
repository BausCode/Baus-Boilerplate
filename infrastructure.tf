
variable "heroku_email" {}
variable "heroku_api_key" {}
variable "slack_webhook" {}
variable "cloudflare_email" {}
variable "cloudflare_api_key" {}
variable "app" {}
variable "pipeline" {}
variable "collaborator" {}
variable "buildpack" {
  default = "heroku/nodejs"
}

variable "salt" {
  type = "map"
  default = {
    dev = ""
    sta = ""
  }
}

provider "heroku" {
  email = "${var.heroku_email}"
  api_key = "${var.heroku_api_key}"
}

provider "cloudflare" {
  email = "${var.cloudflare_email}"
  token = "${var.cloudflare_api_key}"
}

####################################################
# DEVELOPMENT
####################################################
resource "heroku_app" "dev" {
  name = "${var.app}-dev-${var.salt.dev}"
  region = "us"

  config_vars = {
    NPM_CONFIG_PRODUCTION = "false"
  }

  provisioner "local-exec" {
    command = "heroku buildpacks:set ${var.buildpack} --app ${heroku_app.dev.name}"
  }
  provisioner "local-exec" {
    command = "heroku pipelines:create ${var.pipeline} --stage development --app ${heroku_app.dev.name}"
  }
}

resource "heroku_addon" "dev_sendgrid" {
  app = "${heroku_app.dev.name}"
  plan = "sendgrid:starter"
}

resource "heroku_addon" "dev_deployhook" {
  app = "${heroku_app.dev.name}"
  plan = "deployhooks:http"
  config {
    url = "${var.slack_webhook}"
  }
}

resource "heroku_domain" "dev" {
  hostname = "${var.app}-dev-${var.salt.dev}.codebaus.com"
  app = "${heroku_app.dev.name}"
}

resource "cloudflare_record" "dev" {
  domain = "codebaus.com"
  name = "${var.app}-dev-${var.salt.dev}"
  value = "${heroku_domain.dev.cname}"
  type = "CNAME"
}

####################################################
# STAGING
###################################################
resource "heroku_app" "sta" {
  name = "${var.app}-sta-${var.salt.sta}"
  region = "us"

  config_vars = {
    NPM_CONFIG_PRODUCTION = "false"
  }

  depends_on = ["heroku_app.dev"]

  provisioner "local-exec" {
    command = "heroku buildpacks:set ${var.buildpack} --app ${heroku_app.sta.name}"
  }

  provisioner "local-exec" {
    command = "heroku pipelines:add ${var.pipeline} --stage staging --app ${heroku_app.sta.name}"
  }
}

resource "heroku_addon" "sta_deployhook" {
  app = "${heroku_app.sta.name}"
  plan = "deployhooks:http"
  config {
    url = "${var.slack_webhook}"
  }
}

resource "heroku_addon" "sta_sendgrid" {
  app = "${heroku_app.sta.name}"
  plan = "sendgrid:starter"
}

resource "heroku_domain" "sta" {
  hostname = "${var.app}-sta-${var.salt.sta}.codebaus.com"
  app = "${heroku_app.sta.name}"
}

resource "cloudflare_record" "sta" {
  domain = "codebaus.com"
  name = "${var.app}-sta-${var.salt.sta}"
  value = "${heroku_domain.sta.cname}"
  type = "CNAME"
}

#####################################################
## PRODUCTION
#####################################################
# resource "heroku_app" "pro" {
#   name = "${var.app}-pro"
#   region = "us"
#   depends_on = ["heroku_app.dev"]

# config_vars = {
#   SYMFONY_ENV = "prod"
# }

#   # provisioner "local-exec" {
#   #   command = "heroku buildpacks:add heroku/nodejs --app ${heroku_app.pro.name}"
#   # }
#   provisioner "local-exec" {
#     command = "heroku pipelines:add ${var.pipeline} --stage production --app ${heroku_app.pro.name}"
#   }
  # provisioner "local-exec" {
  #   command = "heroku access:add ${var.collaborator} --app ${heroku_app.pro.name}"
  # }

#   lifecycle {
#     prevent_destroy = true
#   }
# }

# resource "heroku_addon" "pro_webhook" {
#   app = "${heroku_app.pro.name}"
#   plan = "deployhooks:http"
#   config {
#     url = "${var.slack_webhook}"
#   }

#   lifecycle {
#     prevent_destroy = true
#   }
# }

# resource "heroku_domain" "pro_bauscode" {
#   hostname = "${var.app}.bauscode.com"
#   app = "${heroku_app.pro.name}"

#   lifecycle {
#     prevent_destroy = true
#   }
# }

# resource "cloudflare_record" "pro_bauscode" {
#   domain = "bauscode.com"
#   name = "${var.app}"
#   value = "${heroku_domain.pro_bauscode.cname}"
#   type = "CNAME"

#   lifecycle {
#     prevent_destroy = true
#   }
# }