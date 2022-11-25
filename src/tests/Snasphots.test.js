
import renderer from 'react-test-renderer';
import React from "react";
import { ArticleCard, ArticleCards } from "../components";

const article = {
  rank: 1,
  article: "Test_Article",
  views: 100,
};

it('renders article card', () => {
  const component = renderer.create(
    <ArticleCard result={article} onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders article cards with results', () => {


  const component = renderer.create(
    <ArticleCards articles={[article]} onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders article cards without results', () => {
  const component = renderer.create(
    <ArticleCards articles={[]} onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders article cards loading', () => {
  const component = renderer.create(
    <ArticleCards articles={[]} loading onMoreInfo={() => {}} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
