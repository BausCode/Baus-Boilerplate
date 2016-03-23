
variable "heroku_email" {}
variable "heroku_api_key" {}
variable "slack_webhook" {}
variable "cloudflare_email" {}
variable "cloudflare_api_key" {}
variable "app" {}

variable "salt" {
  type = "map"
  default = {
    # dev = ""
    # sta = ""
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

#
# DEVELOPMENT
#
resource "heroku_app" "dev" {
  name = "${var.app}-dev-${var.salt.dev}"
  region = "us"
}

resource "heroku_addon" "dev" {
  app = "${heroku_app.dev.name}"
  plan = "deployhooks:http"
  config {
    url = "${var.slack_webhook}"
  }
}

resource "heroku_domain" "dev" {
  hostname = "${var.app}-${var.salt.dev}.codebaus.com"
  app = "${heroku_app.dev.name}"
}

resource "cloudflare_record" "dev" {
  domain = "codebaus.com"
  name = "${var.app}-${var.salt.dev}"
  value = "${heroku_domain.dev.cname}"
  type = "CNAME"
}

#
# STAGING
#
resource "heroku_app" "sta" {
  name = "${var.app}-sta-${var.salt.sta}"
  region = "us"
}

resource "heroku_addon" "sta" {
  app = "${heroku_app.sta.name}"
  plan = "deployhooks:http"
  config {
    url = "${var.slack_webhook}"
  }
}

resource "heroku_domain" "sta" {
  hostname = "${var.app}-${var.salt.sta}.codebaus.com"
  app = "${heroku_app.sta.name}"
}

resource "cloudflare_record" "sta" {
  domain = "codebaus.com"
  name = "${var.app}-${var.salt.sta}"
  value = "${heroku_domain.sta.cname}"
  type = "CNAME"
}

#
# PRODUCTION
#
resource "heroku_app" "pro" {
  name = "${var.app}-pro"
  region = "us"
}

resource "heroku_addon" "pro_webhook" {
  app = "${heroku_app.pro.name}"
  plan = "deployhooks:http"
  config {
    url = "${var.slack_webhook}"
  }
}

resource "heroku_domain" "pro_bauscode" {
  hostname = "${var.app}.bauscode.com"
  app = "${heroku_app.pro.name}"
}

resource "cloudflare_record" "pro_bauscode" {
  domain = "bauscode.com"
  name = "${var.app}"
  value = "${heroku_domain.pro_bauscode.cname}"
  type = "CNAME"
}
