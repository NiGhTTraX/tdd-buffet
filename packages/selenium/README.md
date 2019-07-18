> Docker scripts to start a Selenium grid

[![Build Status](https://travis-ci.com/NiGhTTraX/tdd-buffet.svg?branch=master)](https://travis-ci.com/NiGhTTraX/tdd-buffet) [![codecov](https://codecov.io/gh/NiGhTTraX/tdd-buffet/branch/master/graph/badge.svg)](https://codecov.io/gh/NiGhTTraX/tdd-buffet)

----

## Requirements

- bash
- Docker
- docker-compose


## Start a grid with Chrome and Firefox

```sh
npx @tdd-buffet/selenium start [N=1]
```

The hub will listen at `0.0.0.0:4444` and it will have 2*N browser nodes (N Chrome and N Firefox):


## Start a grid with debug nodes with VNC

```sh
npx @tdd-buffet/selenium debug
```

The same hub as above will spin up, but this time only 2 nodes (Chrome and Firefox) with VNC enabled will connect. VNC is available at `0.0.0.0:5900` (Chrome) and `0.0.0.0:5901` (Firefox).


## Stop everything

```sh
npx @tdd-buffet/selenium stop
```

