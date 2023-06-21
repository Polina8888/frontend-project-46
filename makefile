install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

publish:
	npm publish

test:
	npm test
