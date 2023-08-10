.PHONY: help setup

NPM ?= $(shell which npm)
YARN ?= $(shell which yarn)
# PKG_MANAGER ?= $(if $(YARN),$(YARN),$(NPM))
PKG_MANAGER ?= yarn

help: ## Show help.
	@printf "A set of development's commands.\n"
	@printf "\nUsage:\n"
	@printf "\t make \033[36m<commands>\033[0m\n"
	@printf "\nThe Commands are:\n\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\t\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: ## Setup application.
	@$(PKG_MANAGER) install
