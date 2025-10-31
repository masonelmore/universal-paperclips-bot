.PHONY: build clean run watch

build: clean
	npx vite build
	cp -r game/* build

clean:
	rm -rf build

run: build
	./scripts/run.sh

watch:
	./scripts/watch.sh
