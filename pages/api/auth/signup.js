import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  console.log('data', data)
  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });
  console.log('existingUser', existingUser)
  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  console.log('hashedPassword', hashedPassword)
  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });
  console.log('result', result)
  res.status(201).json({ message: 'Created user!' });
  client.close();
}

export default handler;
