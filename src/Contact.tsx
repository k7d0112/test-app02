import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Contact.css';

const Form = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<{[key:string]:string}>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = () => {
    const errors:{[key:string]:string} = {};
    if(!name) {
        errors.name = '名前は必須です';
    } else if (name.length > 30) {
        errors.name = ' 名前は30文字以内で入力してください';
    }
    if (!email) {
        errors.email = 'メールアドレスは必須です';
    } else if (!/\S+@\S+\.\S+/.test(email)){
        errors.email = '有効なメールアドレスを入力してください';
    }
    if(!message) {
        errors.message = '内容は必須です';
    } else if (message.length > 500){
        errors.message = '内容は500文字以内で入力してください';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e :FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try{
      await sendForm({name,email,message});
      alert('送信完了しました');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      alert('送信に失敗しました。再度お試しください');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  type formData = {
    name:string,
    email:string,
    message:string
  };

  const sendForm = async (formData:formData) => {
    try {
      const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  return (
    <>
      <div className='form__container'>
      <h1 className='contact__title'>問合わせフォーム</h1>
      <form className='form' onSubmit={handleSubmit}>
        <dl className='form__list'>
          <div className='form__field'>
            <dt className='form__label'><label htmlFor='name'>お名前</label></dt>
            <dd className='form__data'><input type='text' id ='name' name='name' className='form__input' value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} required/></dd>
          </div>
            {errors.name && <p className='error'>{errors.name}</p>}
          <div className='form__field'>
            <dt className='form__label'><label htmlFor='email'>メールアドレス</label></dt>
            <dd className='form__data'><input type='email' id ='email' name='email' className='form__input' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} required/></dd>
          </div>
            {errors.email && <p className='error'>{errors.email}</p>}
          <div className='form__field'>
            <dt className='form__label'><label htmlFor='content'>本文</label></dt>
            <dd className='form__data'><textarea id ='content' name='content' className='form__input textarea' value={message} onChange={(e) => setMessage(e.target.value)} disabled={isSubmitting} required></textarea></dd>
          </div>
            {errors.message && <p className='error'>{errors.message}</p>}
        </dl>
        <div className='buttons'>
            <input type='submit' className='button button__submit' disabled={isSubmitting} />
            <button className='button button__clear' onClick={handleClear} disabled={isSubmitting}>クリア</button>
        </div>
      </form>
      </div>
    </>
  );
};

export default Form;