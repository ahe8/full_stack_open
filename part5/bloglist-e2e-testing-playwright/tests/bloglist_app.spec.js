const { beforeEach, describe, test, expect } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Austin He',
                username: 'austinhe',
                password: 'password321'
            }
        })

        await page.goto('/')
    })

    test('login form is shown', async ({ page }) => {
        const locator = await page.getByText('log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'austinhe', 'password321')

            await expect(page.getByText('Austin He logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'heaustin', 'badpassword')

            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'austinhe', 'password321')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'Pride and Prejudice', 'Jane Austen', 'www.janeausten.com')
            
            await expect(page.getByText('Pride and Prejudice Jane Austen')).toBeVisible()
        })

        describe('After multiple blogs are added', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'blog1', 'author one', 'www.testone.com')
                await createBlog(page, 'blog2', 'author two', 'www.testtwo.com')
                await createBlog(page, 'blog3', 'author three', 'www.testthree.com')
            })

            test('a blog can be liked', async({ page }) => {
                const blog = await page.locator('.blog').filter({ hasText:'blog2'})
                await blog.getByRole('button', {'name': 'view'}).click()

                await expect(blog.getByText('likes 0')).toBeVisible()

                await blog.getByRole('button', {'name':'like'}).click()
                await expect(blog.getByText('likes 1')).toBeVisible() 
            })

            test('a blog can be deleted by the person who added it', async({ page }) => {
                const blog = await page.locator('.blog').filter({ hasText:'blog3'})
                await blog.getByRole('button', {'name': 'view'}).click()
        
                page.on('dialog', dialog => dialog.accept());
        
                await blog.getByRole('button', {'name': 'remove'}).click()
        
                await expect(page.getByText('blog3')).not.toBeVisible() 
            })

            test('blogs are shown in order by most to least likes', async ({page}) => {
                await createBlog(page, 'mostliked', 'Ron Weasley', 'www.harrypotter.com')
                await createBlog(page, 'secondmost', 'Snape', 'www.snape.com')

                const mostLikedBlog = await page.locator('.blog').filter({hasText:'mostliked'})
                await mostLikedBlog.getByRole('button', {'name':'view'}).click()

                for(let i = 0; i < 10; i++) {
                    await mostLikedBlog.getByRole('button', {'name':'like'}).click()
                    await new Promise(res => setTimeout(res, 300))
                }

                const secondMostLikedBlog = await page.locator('.blog').filter({hasText:'secondmost'})
                await secondMostLikedBlog.getByRole('button', {'name':'view'}).click()

                for(let i = 0; i < 8; i++) {
                    await secondMostLikedBlog.getByRole('button', {'name':'like'}).click()
                    await new Promise(res => setTimeout(res, 300))
                }

                const thirdMostLikedBlog = await page.locator('.blog').filter({hasText:'blog2'})
                await thirdMostLikedBlog.getByRole('button', {'name':'view'}).click()

                for(let i = 0; i < 5; i++) {
                    await thirdMostLikedBlog.getByRole('button', {'name':'like'}).click()
                    await new Promise(res => setTimeout(res, 300))
                }

                const fourthMostLikedBlog = await page.locator('.blog').filter({hasText:'blog1'})
                await fourthMostLikedBlog.getByRole('button', {'name':'view'}).click()

                for(let i = 0; i < 2; i++) {
                    await fourthMostLikedBlog.getByRole('button', {'name':'like'}).click()
                    await new Promise(res => setTimeout(res, 300))
                }

                const allBlogs = await page.locator('.blog').all()

                await expect(allBlogs[0].getByText('mostliked')).toBeVisible()
                await expect(allBlogs[1].getByText('secondmost')).toBeVisible()
                await expect(allBlogs[2].getByText('blog2')).toBeVisible()
                await expect(allBlogs[3].getByText('blog1')).toBeVisible()
                await expect(allBlogs[4].getByText('blog3')).toBeVisible()
            })
        })        
    })


    test('user who did not add the blog cannot see the delete button', async({ page, request }) => {
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'User Two',
                username: 'usertwo',
                password: '123password'
            }
        })

        await loginWith(page, 'usertwo', '123password')
        await createBlog(page, 'Full Stack Open', 'Matti Luukkainen', 'www.fullstackopen.com')
        
        await page.getByRole('button', {'name': 'logout'}).click()
        await loginWith(page, 'austinhe', 'password321')
        
        await page.getByRole('button', {'name': 'view'}).click()

        await expect(page.getByRole('button', {'name': 'remove'})).not.toBeVisible()
    })

})
