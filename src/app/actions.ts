
'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  subject: z.string().min(3, { message: 'O assunto deve ter pelo menos 3 caracteres.' }),
  message: z.string().min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor, corrija os erros no formulário.',
      success: false,
    };
  }
  
  // Aqui normalmente você enviaria um e-mail. Para esta simulação, apenas registramos os dados.  console.log('Form data submitted:', validatedFields.data);

  // Em uma aplicação real, você integraria com um serviço de e-mail como Resend, SendGrid ou Nodemailer.  // const { name, email, subject, message } = validatedFields.data;

  return {
    message: 'Obrigado pelo seu contato! Responderei em breve.',
    success: true,
  };
}
