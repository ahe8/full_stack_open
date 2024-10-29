const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')

const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')

const resolvers = {
    Query: {
        authorCount: async () => Author.collection.countDocuments(),
        bookCount: async () => Book.collection.countDocuments(),
        allAuthors: async (root, args) => {
            const books = await Book.find({}).populate('author')
            const authors = await Author.find({})
            
            //authors.forEach(author=>console.log(author))

            const res = authors.map(author => {
                const results = books.filter(book => book.author.id === author.id)
                return {...author._doc, bookCount: results.length}
            })


            return res
        },
        allBooks: async (root, args) => {
            return await Book.find({}).populate('author')
        },
        findBooksWithGenre: async (root, args) => {
            let query = {}
            if(args.genre) {
                query = {...query, genres: args.genre}
            }
            return await Book.find(query).populate('author')
        },
        findAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name }).exec()
            const booksByAuthor = await Book.find({ author: author.id})
            return {...author._doc, bookCount: booksByAuthor.length}
        },
        findBook: async (root, args) => {
            let query = {}
            if (args.title) {
                query = { ...query, title: { $eq: args.title } }
            }
            if (args.genre) {
                query = { ...query, genres: args.genre }
            }
            return await Book.find(query).populate('author')
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const authorOfBook = await Author.findOne({ name: { $eq: args.author } })
            if (!authorOfBook) {
                throw new GraphQLError('Author not found')
            }

            const book = await new Book({ ...args, author: authorOfBook._id }).populate('author', { name: 1 })

            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving Book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }


            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        addAuthor: async (root, args) => {
            const author = new Author({ ...args })
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving Author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return author
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            return await Author.findOneAndUpdate({ name: { $eq: args.name } }, { born: args.setBornTo })
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers