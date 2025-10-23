.PHONY: build clean run watch

build: clean
	./scripts/build.sh

clean:
	rm -rf build

run: build
	./scripts/run.sh

watch:
	./scripts/watch.sh
