# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.provider :virtualbox do |v|
    v.customize ["modifyvm", :id, "--memory", 1512]
  end

  config.vm.define 'web', primary: true do |web|
    web.vm.network "private_network", ip: '10.0.0.10'

    web.vm.network "forwarded_port", guest: 8080, host: 8080

    web.vm.synced_folder "./", "/home/vagrant/Baus-Boilerplate",
                         owner: "vagrant", group: "vagrant"

    web.vm.provision "shell", name: "CLI Tools", inline: <<-SHELL
      sudo su vagrant -c "curl -sS -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash"

      echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
    SHELL

    web.vm.provision "shell", name: "node/bable/sass-rebuild", inline: <<-SHELL
      source /home/vagrant/.profile

      cd /home/vagrant/Baus-Boilerplate

      nvm install 6.3.0

      npm install -g babel babel-cli

      if [ -d "/home/vagrant/Baus-Boilerplate/node_modules" ]
      then
          npm rebuild node-sass
      else
          npm install
      fi
    SHELL

    web.vm.provision "shell", name: "App startup", run: "always", inline: <<-SHELL
      source /home/vagrant/.profile

      cd /home/vagrant/Baus-Boilerplate

      npm run dev
    SHELL
  end

end #config
