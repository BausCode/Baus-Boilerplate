MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

NODE_BIN = node_modules/.bin
NODEMON = $(NODE_BIN)/nodemon

clean:
	@echo ' removing public and creating clean directory'
	@rm  -rf public/dist && mkdir public/dist

dev:
	$(MAKE) clean
	$(MAKE) start
	
dist:
	$(MAKE) clean 
	$(MAKE) webpack-prod
	
start:
	@echo ' starting server ' 
	$(NODEMON) index.js
	
prod:
	@NODE_ENV=production node index.js
	
test:
	@echo "Error: no tests specified"
	@exit 1
	
webpack-prod:
	$(NODE_BIN)/webpack --config ./webpack/production.config.js --progress --profile --colors
	
hello:
	@say "hello baus code"
	
