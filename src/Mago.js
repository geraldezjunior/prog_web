import Personagem from './Personagem.js';

export default class Mago extends Personagem {
  constructor(nome, vida = 80, mana = 100, forca = 8, defesa = 3) {
    super(nome, vida, mana, forca, defesa);
  }

  atacar(alvo) {
    if (!this.estaVivo()) {
      console.log(`${this.nome} não pode atacar pois está derrotado!`);
      return;
    }
    if (!alvo || !alvo.estaVivo()) {
      console.log(`Alvo inválido ou já derrotado!`);
      return;
    }

    console.log(`🪄 Mago ${this.nome} ataca ${alvo.nome}!`);
    alvo.receberDano(this.forca);
  }

  usarHabilidadeEspecial(alvo) {
    if (!this.estaVivo()) {
      console.log(
        `${this.nome} não pode usar habilidade especial pois está derrotado!`,
      );
      return;
    }
    if (!alvo || !alvo.estaVivo()) {
      console.log(`Alvo inválido ou já derrotado!`);
      return;
    }

    const custoMana = 25;
    if (this.usarMana(custoMana)) {
      const danoAumentado = this.forca * 3;
      console.log(
        `🔥 Mago ${this.nome} lança Bola de Fogo em ${alvo.nome} com dano aumentado (${danoAumentado})!`,
      );
      alvo.receberDano(danoAumentado);
    }
  }
}
