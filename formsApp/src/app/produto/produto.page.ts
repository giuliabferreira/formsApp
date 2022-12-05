import { Produto } from './../models/produto';
import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  formProduto: FormGroup;
  produto: Produto = new Produto();

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O campo precisa ter pelo menos 3 caracteres!' },
    ],
    descricao: [
      { tipo: 'required', mensagem: 'O campo Descrição é obrigatório.' },
    ],
    validade: [
      { tipo: 'required', mensagem: 'O campo Validade é Obrigatório.' },
    ],
    preco: [{ tipo: 'required', mensagem: 'O campo Preço é obrigatório.' },
  ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private route: Router
  ) {
    this.formProduto = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      descricao: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      validade: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
      preco: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  ngOnInit() {}
  async salvarProduto() {
    if (this.formProduto.valid) {
      this.produto.nome = this.formProduto.value.nome;
      this.produto.descricao = this.formProduto.value.descricao;
      this.produto.validade = this.formProduto.value.validade;
      this.produto.preco = this.formProduto.value.preco;
      await this.storageService.set(this.produto.nome, this.produto);
      this.route.navigateByUrl('tabs/tab1');
    } else {
      alert('Formulário inválido!');
    }
  }
}
