import { Component } from '@angular/core';
import { ApolloError } from '@apollo/client/errors';
import { Apollo } from 'apollo-angular';
import { GetPostsDocument, GetPostsQuery } from 'src/generated/graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'frontend';

  loading = true;
  error?: ApolloError;
  posts?: GetPostsQuery['posts'];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<GetPostsQuery>({
        query: GetPostsDocument,
      })
      .valueChanges.subscribe((result) => {
        this.posts = result?.data?.posts;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
