{ pkgs ? import <nixpkgs> {} }:

let
  unstable = import (fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz";
    sha256 = "sha256:171wlwhw8sqkc6p1nzhs6rl1c4zhvlv2w4xrdp7h7sj9v6g9k8qr";
  }) {
    inherit (pkgs) system;
    config = pkgs.config;
  };
in pkgs.mkShell {
  buildInputs = with pkgs; [
    deno
    nodejs_22
    tmux
  ];

  shellHook = ''
    echo "🚀 Starting development environment..."
    export COMPOSE_PROJECT_NAME="dustindowell"
  '';
}
