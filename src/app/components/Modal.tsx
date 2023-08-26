import styles from "./Modal.module.css";

import { IoArrowBack } from "react-icons/io5";

interface Modal {
  aviso: string;
  mensagem?: string;
  visivel: boolean;
  setConfirmacaoVisivel: React.Dispatch<React.SetStateAction<boolean>>;
  onClickBotao: () => void;
  loadingBotao?: boolean;
}

export default function Modal({
  aviso,
  mensagem = "",
  visivel,
  setConfirmacaoVisivel,
  onClickBotao,
  loadingBotao = false,
}: Modal) {
  if (!visivel) return null;
  return (
    <div className={styles.modalConfirmacaoBlur}>
      <div className={styles.modalConfirmacao}>
        <section>
          <h2>Confirmação</h2>
          <div className={styles.divUnderline}></div>
        </section>
        <div className={styles.divTextos}>
          <h3>{aviso}</h3>
          <p>{mensagem}</p>
          <div className={styles.divBotoes}>
            <button
              className={styles.botaoVoltar}
              onClick={() => setConfirmacaoVisivel(false)}
            >
              CANCELAR
            </button>
            <button onClick={onClickBotao} className={styles.botaoConfirmar}>
              <p style={loadingBotao ? { visibility: "hidden" } : {}}>
                CONFIRMAR
              </p>
              {loadingBotao && (
                <img
                  src="/loading-animation.svg"
                  alt="Carregando..."
                  className={styles.iconeCarregamento}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
