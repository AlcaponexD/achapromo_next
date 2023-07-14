export default function Recovery({ toogleLoginMode }) {
  return (
    <div>
      <form>
        {/* Login component  */}
        <div className="flex flex-col p-4">
          <span>Endereço de e-mail</span>
          <input
            className="p-2 border-light-primary border-2 rounded-md hover:border-light-secondary"
            placeholder="Seu email@provedor.com.br"
            type="text"
          ></input>
          <button className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary">
            Recuperar senha
          </button>
        </div>
      </form>
      <div
        className={`flex items-start justify-between flex-col p-4 border-t rounded-t dark:border-gray-600`}
      >
        <h4 className="text-base mt-2">
          Já tem conta?{" "}
          <span
            onClick={() => {
              toogleLoginMode("login");
            }}
            className="cursor-pointer text-light-primary font-bold"
          >
            Faça o login
          </span>
        </h4>
      </div>
    </div>
  );
}
