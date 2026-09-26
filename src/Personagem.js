export default class Personagem {
  #nome;
  #vida;
  #vidaMaxima;
  #mana;
  #manaMaxima;
  #forca;
  #defesa;

  constructor(nome, vida, mana, forca = 10, defesa = 5) {
    if (new.target === Personagem) {
      throw new Error(
        "A classe 'Personagem' é abstrata e não pode ser instanciada diretamente."
      );
    }

    this.#nome = nome;
    this.#vidaMaxima = Math.max(1, vida);
    this.#vida = this.#vidaMaxima;
    this.#manaMaxima = Math.max(0, mana);
    this.#mana = this.#manaMaxima;
    this.#forca = Math.max(0, forca);
    this.#defesa = Math.max(0, defesa);
  }

  get nome() {
    return this.#nome;
  }

  get vida() {
    return this.#vida;
  }

  get vidaMaxima() {
    return this.#vidaMaxima;
  }

  get mana() {
    return this.#mana;
  }

  get manaMaxima() {
    return this.#manaMaxima;
  }

  get forca() {
    return this.#forca;
  }

  get defesa() {
    return this.#defesa;
  }

  estaVivo() {
    return this.#vida > 0;
  }

  receberDano(danoBruto) {
    if (!this.estaVivo()) {
      console.log(`${this.#nome} já está derrotado!`);
      return 0;
    }

    const danoReal = Math.max(1, danoBruto - this.defesa);
    this.#vida = Math.max(0, this.#vida - danoReal);

    console.log(
      `${this.#nome} recebeu ${danoReal} de dano! (Vida: ${this.#vida}/${this.#vidaMaxima})`
    );

    if (!this.estaVivo()) {
      console.log(`☠️ ${this.#nome} foi derrotado!`);
    }

    return danoReal;
  }

  curar(quantidade) {
    if (!this.estaVivo()) return;
    const vidaAnterior = this.#vida;
    this.#vida = Math.min(this.#vidaMaxima, this.#vida + quantidade);
    console.log(
      `✨ ${this.#nome} foi curado em ${this.#vida - vidaAnterior}! (Vida: ${this.#vida}/${this.#vidaMaxima})`
    );
  }

  usarMana(quantidade) {
    if (this.#mana >= quantidade) {
      this.#mana -= quantidade;
      return true;
    }
    console.log(`⚠️ ${this.#nome} não possui mana suficiente!`);
    return false;
  }

  regenerarMana(quantidade) {
    const manaAnterior = this.#mana;
    this.#mana = Math.min(this.#manaMaxima, this.#mana + quantidade);
    console.log(
      `🔹 ${this.#nome} regenerou ${this.#mana - manaAnterior} de mana!`
    );
  }

  atacar(alvo) {
    throw new Error(
      "O método abstrato 'atacar()' deve ser implementado pela sub-classe."
    );
  }

  usarHabilidadeEspecial(alvo) {
    throw new Error(
      "O método abstrato 'usarHabilidadeEspecial()' deve ser implementado pela sub-classe."
    );
  }

  obterStatus() {
    return {
      nome: this.#nome,
      vida: `${this.#vida}/${this.#vidaMaxima}`,
      mana: `${this.#mana}/${this.#manaMaxima}`,
      forca: this.#forca,
      defesa: this.defesa,
      status: this.estaVivo() ? "Vivo" : "Derrotado"
    };
  }

  exibirStatus() {
    const status = this.obterStatus();
    console.log(`-----------------------------------`);
    console.log(`🎭 ${status.nome} [${status.status}]`);
    console.log(`❤️  Vida: ${status.vida} | 🧪 Mana: ${status.mana}`);
    console.log(`⚔️  Força: ${status.forca} | 🛡️ Defesa: ${status.defesa}`);
    console.log(`-----------------------------------`);
  }
}
